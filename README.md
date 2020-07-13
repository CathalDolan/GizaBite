

How Commits are Done:
Branches, pushes, commits, etc.
https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches

Accordion - https://www.w3schools.com/bootstrap4/bootstrap_collapse.asp

Each time I worked on a page I created a new brnach, likewise when I was trying something new. To do this I:
- Create the branch on your local machine and switch in this branch: $ git checkout -b [name_of_your_new_branch]
If you want create a new branch: $ git branch <name_of_your_new_branch>
- Push the branch on github : $ git push origin [name_of_your_new_branch]

As I was finished something I'd do:
- git add . or 
- git commit
- git push

Once fully finished:
- git merge master
- Address any conflicts
- git add etc again
- git push to remote feature branch
- do pull and conflict in github

When you want to commit something in your branch, be sure to be in your branch. Add -u parameter to set-upstream.

You can see all the branches created by using : $ git branch -a

Which will show :
* approval_messages
  master
  master_clean

Add a new remote for your branch : $ git remote add [name_of_your_remote] [name_of_your_new_branch]

Push changes from your commit into your branch : $ git push [name_of_your_new_remote] [url]

Update your branch when the original branch from official repository has been updated : $ git fetch [name_of_your_remote]

Delete a branch on your local filesystem : $ git branch -d [name_of_your_new_branch]

To force the deletion of local branch on your filesystem : $ git branch -D [name_of_your_new_branch]

Delete the branch on github : $ git push origin :[name_of_your_new_branch]

