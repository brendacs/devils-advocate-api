# Devil's Advocate Survey API Integrations

A workaround for TypeForm's one score variable, specific to Devil's Advocate.

This project used TypeForm's Response API and MailChimp's API v3.0 to calculate 7 different scores stored in different 7 score variables based on each user's survey responses. From these calculated scores, users that signed up are subscribed to 7 of 16 possible MailChimp lists based on their scores.

Every 24 hours, TypeForm survey data from the last 24 hours are scored and subscribers are added to MailChimp lists.

 Recently, a method for automatically adding members to one master list with 16 different different groups (interests) was added.

Integrations were done using JavaScript (ES6), Node, and Express.
