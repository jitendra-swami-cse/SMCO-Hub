# Status Lifecycle

SMCO-Hub operates on a strict, forward-moving status lifecycle to track content from ideation to publication.

## Global Content Status
The overarching status of a content piece is tracked at the root level:

```text
Received
   ↓
Approved
   ↓
Uploaded
   ↓
Recycle Bin (Soft Delete)
```

## Platform Publishing Matrix Status
Because one piece of content can be posted to multiple networks at different times, each destination platform has its own independent lifecycle state:

```text
Pending (Waiting for action)
   ↓
Approved (Ready to be scheduled)
   ↓
Scheduled (Assigned a future date/time)
   ↓
Uploaded (Live on the network)
```

**Rule:** The global Content Status is automatically considered "Uploaded" only when *all* associated Platform statuses reach "Uploaded".
