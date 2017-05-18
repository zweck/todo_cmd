## todoc.md
### README

This is a very simple node cli for creating todos via the command line; you can also mark them as _done_/_not done_.

#### Install
1. `git clone git@github.com:zweck/todo_cmd.git`
2. `npm install`
3. `npm link`

#### Commands
```
  init        [options] -dir | -d, initialize a new todo workbook
  add         [options] -item | -i, create a new todo in today's file
  list        list all the todos
  new-day     create a new .md for today
  get-folder  get the folder for your todos
  set-folder  [options] -dir | -d, set the folder for your todos
```

The basic folder structure is:

```
└── 2017
    └── 05
        └── 2017_05_15.md
```

The todos are added as markdown todos (`[ ]` & `[x]`)

Feel free to add / edit and modify the `.md` files as much as you like; all this app cares about is matching either `[ ]` & `[x]` and new lines.
