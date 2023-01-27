const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_API_KEY });


async function getDb() {
    const database = await notion.databases.retrieve({
        database_id: process.env.NOTION_DATABASE_ID,
    });

    console.log(database, 'Db info---------------------------------');
}


function createDbEntry({ title, description, date, number }) {
    console.log(title, description, process.env.NOTION_TITLE_ID, 'process.env.NOTION_TITLE_ID');
    notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID,
      },
      properties: {
        [process.env.NOTION_TITLE_ID]: {
          title: [
            {
              type: "text",
              text: {
                content: title,
              },
            },
          ],
        },
        [process.env.NOTION_DESCRIPTION_ID]: {
          rich_text: [
            {
              type: "text",
              text: {
                content: description,
              },
            },
          ],
        },

        [process.env.NOTION_DATE_ID]: {
            rich_text: [
              {
                type: "text",
                text: {
                    content: date,
                  },
              },
            ],
          },

          [process.env.NOTION_NUMBER_ID]: {
            rich_text: [
                {
                  type: "text",
                  text: {
                      content: number,
                    },
                },
              ],
          },
       
      },
    })
  }

  module.exports = {
    createDbEntry
  }

getDb();