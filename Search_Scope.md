# Search Scope

The Global Search module in SMCO-Hub provides immediate access to core entities, but intentionally limits its scope to maintain performance and relevance.

## What is Searched
When querying the global search bar, the system simultaneously queries three collections:

1. **Clients**
   - Matches against: Name, Email, Phone
2. **Content**
   - Matches against: Title, Hashtags
3. **Accounts**
   - Matches against: Username/Handle

## What is NOT Searched
To prevent database strain and irrelevant results, the following are completely excluded from global search:
- **Client Notes**
- **Content Captions**
- **Passwords / Credentials**
- **File Names**

The search results page displays the results grouped by their entity type, along with a result count per group.
