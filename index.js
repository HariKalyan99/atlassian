import fetch from "node-fetch";

const email = "harikalyan.b@varthana.com";
const apiToken = "ATATT3xFfGF0eF6DJ55hmK9yoZTXtdGVLU2pb6E9dCXlBSnOaziN6JUSAap5oJh6LKpiTfxG2owS6T4imYVStajynXyGGr82QLCNq8BEpyTDBQOM39E8_0OyXYGqiZFNoNkh_Hw3p0K-eOXDLJzScQs7gjIyxqLHJs6YDrZfQc23hXILOsAUjrc=20DF14BC"; // Replace with your Jira API token
const jiraBaseUrl = "https://issues-varthana.atlassian.net";

const bodyData = JSON.stringify({
  fields: {
    project: { key: "FQS" },
    summary: "new task 1",
    description: {
      content: [
        {
          content: [
            { text: "Order entry fails when selecting supplier.", type: "text" }
          ],
          type: "paragraph"
        }
      ],
      type: "doc",
      version: 1
    },
    issuetype: { name: "Task" },
    priority: { name: "High" }
  }
});

async function createJiraIssue() {
  try {
    const response = await fetch(`${jiraBaseUrl}/rest/api/3/issue`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${email}:${apiToken}`).toString("base64")}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: bodyData
    });

    const data = await response.json();
    console.log(`Response: ${response.status} ${response.statusText}`);
    console.log(data);
  } catch (error) {
    console.error("Error creating Jira issue:", error);
  }
}

createJiraIssue();
