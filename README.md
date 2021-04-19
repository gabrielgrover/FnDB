[FnDB]() – The React Native Document database/ORM
=========

FnDB is an open-source document database and ORM for React Native.

FnDB was created to help react native developers build offline first applications.

Using FnDB
-------------

```typescript
  import { createModel } from "fndb";

  const User = createModel("User", {
    name: String,
    age: Number,
    admin: Boolean
  });

  const id = await User.newDoc({
    name: "duder",
    age: 21,
    admin: true
  });

  await User.getDoc(id);

  await User.updateDoc(id, {
    admin: false
  });
```

Contributing
------------

We're always looking for new contributors! 