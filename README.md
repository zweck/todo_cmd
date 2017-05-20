## todoc.md
### README

This is a very simple node cli for creating todos via the command line; you can also mark them as _done_/_not done_.

#### Install
1. `git clone git@github.com:zweck/todo_cmd.git`
2. `npm install`
3. `npm link`

#### Commands
```
  init          initialize a new todo workbook
  add           add todo in today's file
  list          list all the todo's
  get-folder    get the folder for your todos
  set-folder    set the folder for your todos
  get-template  get the template for your todos
  set-template  set the template for your todos using year, month and day
  new-day       create a new .md for today
```

#### Template
You can customise the folder structure, by default files are named `year_month_day.md` however you can customise this. E.g if you set the template to be `year/month/year_month_day` you will end up with: 

```
└── 2017
    └── 05
        └── 2017_05_15.md
```

Currently the templates will only support `year`, `month` and `day` keywords.

The todos are added as markdown todos (`[ ]` & `[x]`)

Feel free to add / edit and modify the `.md` files as much as you like; all this app cares about is matching either `[ ]` & `[x]` and new lines.
