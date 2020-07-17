

How Commits are Done:
Branches, pushes, commits, etc.
https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches

Accordion - https://www.w3schools.com/bootstrap4/bootstrap_collapse.asp
Buttons - https://getbootstrap.com/docs/4.0/components/buttons/

Each time I worked on a page I created a new brnach, likewise when I was trying something new. To do this I:
- Create the branch on your local machine and switch in this branch: $ git checkout -b [name_of_your_new_branch]
- Push the branch on github : $ git push origin [name_of_your_new_branch]
-    git push --set-upstream origin ingredient_page_update

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

Images from pexels.com
- Dish Header: https://www.pexels.com/photo/close-up-photo-of-cooked-shrimp-with-sauce-2291353/
- New Dish: https://www.pexels.com/photo/pasta-noodles-tomato-sauce-spirelli-14737/
- Portion: https://www.pexels.com/photo/cheeseburger-and-fries-2725744/
- New Portion: https://www.pexels.com/photo/close-up-photo-of-french-fries-4109234/
- Ingredients Header: https://www.pexels.com/photo/food-healthy-vegetables-vegetarian-45914/
- Search Page: https://www.pexels.com/photo/sliced-fried-chicken-2232433/
- Index Page: https://www.pexels.com/photo/grilled-salmon-fish-on-rectangular-black-ceramic-plate-842142/
- https://www.pexels.com/photo/mouth-watering-hamburgers-3052362/
- https://www.pexels.com/photo/assorted-variety-of-foods-on-plates-on-dining-table-1528013/
- https://www.pexels.com/photo/food-chicken-fresh-rice-105588/
