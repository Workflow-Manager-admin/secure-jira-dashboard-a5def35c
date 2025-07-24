#!/bin/bash
cd /home/kavia/workspace/code-generation/secure-jira-dashboard-a5def35c/jira_dashboard_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

