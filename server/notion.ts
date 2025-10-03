import { Client } from '@notionhq/client';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=notion',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('Notion not connected');
  }
  return accessToken;
}

export async function getUncachableNotionClient() {
  const accessToken = await getAccessToken();
  return new Client({ auth: accessToken });
}

export interface NotionPage {
  id: string;
  title: string;
  content?: string;
  excerpt?: string;
  category?: string;
  coverImage?: string;
  createdTime: string;
  lastEditedTime: string;
}

export async function listNotionPages(databaseId: string): Promise<NotionPage[]> {
  const notion = await getUncachableNotionClient();
  
  const response = await (notion as any).databases.query({
    database_id: databaseId,
    sorts: [
      {
        timestamp: 'last_edited_time',
        direction: 'descending',
      },
    ],
  });

  return response.results.map((page: any) => {
    const properties = page.properties;
    
    let title = 'Untitled';
    if (properties.Name?.title?.[0]?.plain_text) {
      title = properties.Name.title[0].plain_text;
    } else if (properties.Title?.title?.[0]?.plain_text) {
      title = properties.Title.title[0].plain_text;
    }

    let excerpt = '';
    if (properties.Excerpt?.rich_text?.[0]?.plain_text) {
      excerpt = properties.Excerpt.rich_text[0].plain_text;
    }

    let category = '';
    if (properties.Category?.select?.name) {
      category = properties.Category.select.name;
    } else if (properties.Tags?.multi_select?.[0]?.name) {
      category = properties.Tags.multi_select[0].name;
    }

    let coverImage = '';
    if (page.cover?.external?.url) {
      coverImage = page.cover.external.url;
    } else if (page.cover?.file?.url) {
      coverImage = page.cover.file.url;
    }

    return {
      id: page.id,
      title,
      excerpt,
      category,
      coverImage,
      createdTime: page.created_time,
      lastEditedTime: page.last_edited_time,
    };
  });
}

export async function getNotionPageContent(pageId: string): Promise<string> {
  const notion = await getUncachableNotionClient();
  
  const blocks = await notion.blocks.children.list({
    block_id: pageId,
  });

  let content = '';
  for (const block of blocks.results) {
    const blockData = block as any;
    if (blockData.type === 'paragraph' && blockData.paragraph?.rich_text) {
      const text = blockData.paragraph.rich_text.map((t: any) => t.plain_text).join('');
      content += text + '\n\n';
    } else if (blockData.type === 'heading_1' && blockData.heading_1?.rich_text) {
      const text = blockData.heading_1.rich_text.map((t: any) => t.plain_text).join('');
      content += '# ' + text + '\n\n';
    } else if (blockData.type === 'heading_2' && blockData.heading_2?.rich_text) {
      const text = blockData.heading_2.rich_text.map((t: any) => t.plain_text).join('');
      content += '## ' + text + '\n\n';
    } else if (blockData.type === 'heading_3' && blockData.heading_3?.rich_text) {
      const text = blockData.heading_3.rich_text.map((t: any) => t.plain_text).join('');
      content += '### ' + text + '\n\n';
    } else if (blockData.type === 'bulleted_list_item' && blockData.bulleted_list_item?.rich_text) {
      const text = blockData.bulleted_list_item.rich_text.map((t: any) => t.plain_text).join('');
      content += '- ' + text + '\n';
    } else if (blockData.type === 'numbered_list_item' && blockData.numbered_list_item?.rich_text) {
      const text = blockData.numbered_list_item.rich_text.map((t: any) => t.plain_text).join('');
      content += '1. ' + text + '\n';
    } else if (blockData.type === 'code' && blockData.code?.rich_text) {
      const text = blockData.code.rich_text.map((t: any) => t.plain_text).join('');
      content += '```\n' + text + '\n```\n\n';
    }
  }

  return content.trim();
}

export async function searchNotionDatabases() {
  const notion = await getUncachableNotionClient();
  
  const response = await (notion as any).search({
    filter: {
      property: 'object',
      value: 'database',
    },
  });

  return response.results.map((db: any) => ({
    id: db.id,
    title: db.title?.[0]?.plain_text || 'Untitled Database',
    url: db.url,
  }));
}
