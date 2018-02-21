# Devil's Advocate Survey API Integrations

A workaround for TypeForm's one score variable, specific to Devil's Advocate.

This project used TypeForm's Response API, the Google Sheets API, and MailChimp's API v3.0 to calculate 7 different scores stored in different 7 score variables based on each user's survey responses. From these calculated scores, users that signed up are subscribed one master mailing list and placed in 7 different groups (interests) out of the 16 total possible groups (interests).

Every 24 hours, TypeForm survey data (retrieved through Google Sheets) from the last 24 hours are scored and subscribers are added to the master Devil's Advocate MailChimp list with their respective groups.

Integrations were done using JavaScript (ES6), Node, and Express.
