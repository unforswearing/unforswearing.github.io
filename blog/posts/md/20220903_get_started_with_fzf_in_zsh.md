## Introduction

Have you ever navigated to a directory in your terminal and wanted to select a file or folder from a menu, rather than typing `ls` to print a list of contents? Or perhaps you would rather use a single command to present a list of `git` options for you to choose instead of having to search your command history for frequently used (but often forgotten) commands? If you have experienced these annoyances, or if you want a simple way to choose items from a menu, `fzf` is the tool for you. 

In this article you will learn about [`fzf`](https://github.com/junegunn/fzf), the command-line fuzzy finder. You will also learn a few ways that `fzf` can improve your scripts. 

## Installing `fzf`

`fzf` can be installed by cloning the repository, using `homebrew` on MacOS, or by using the default package manager in your Linux system. For more information, see [junegunn/fzf#installation](https://github.com/junegunn/fzf#installation).

## Basic Usage

`fzf` can be used to generate a simple menu from a list of items. For example, you can use `fzf` to display a list of files for you to choose from. To do this you can pipe a list of items into `fzf` in your terminal by using the command below

```
find . -type f -maxdepth 1 | fzf
```

You can also use [command substitution](https://www.gnu.org/software/bash/manual/html_node/Command-Substitution.html) to open the selected file in your editor.

```
$EDITOR $(find . -type f -maxdepth 1 | fzf)
```

Now that you understand the basic use of `fzf`, you can use the tool for more interesting automations.

## Use `fzf` with Git

Let's say you have a list of `git` commands that you use regularly but you want to speed up your `git` usage by choosing commands from a menu, rather than typing `git –help` to remember the name of the command you want to use. First, start by printing a list of your commands in your terminal.

```
# The "-e" option translates "\n" to a literal new line, required by fzf
echo -e "clone\ninit\nadd\ncommit\npush\n"
```

Once your list of commands is set, you can pipe this list to `fzf` to display them in a menu

```
echo -en "clone\ninit\nadd –all\ncommit\npush\n" | fzf
```

The command above will present your list of commands as a menu, allowing you to select a command via `fzf`. However, this does not actually run the `git` command. To use `fzf` for executing `git` commands, you can use the code below

```
git $(echo -en "clone\ninit\nadd –all\ncommit\npush\n" | fzf)
```

The above command will run the selected `git` command without any additional work on your part, simplifying your workflow and saving time. 

## Conclusion

In this article you learned about `fzf`, how to install `fzf`, and some basic usage examples you can apply to your workflow today. For more information about the `fzf` command-line fuzzy finder, visit the official `fzf` repository at [https://github.com/junegunn/fzf](https://github.com/junegunn/fzf).


