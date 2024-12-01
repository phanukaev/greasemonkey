# Greasemonkey Scripts

This is my personal collection of greasemonkey userscripts.

## Youtube Music Playlist Extractor

[Click to Install](https://raw.githubusercontent.com/phanukaev/greasemonkey/refs/heads/main/yt_music_playlist.user.js)

Adds a button to any youtube music playlist page which allows the user
to download the playlist in JSON format. Each playlist entry is an
object with properties `title`, `artist`, `album`, and `url` which all
contain the obvious values.

Notes:
- If the button is not showing up, refresh the page.
- This scrapes the document for information. If your playlist is very
long, this means that you have to manually scroll down to the end to
force youtube to load the whole playlist.