# About

"Hashboard" is a simple extension to store short texts. The idea is to be able to copy numerous texts (like URLs, names, or any other short texts) to your clipboard, without leaving the current tab. Option to add, edit, copy, and delete are provided. 

Having started out that way, I have added the following features:
- to rearrange the items on the list.
- a searchbar to filters items by their title.
- download the list as a CSV file (while implementing search, I somehow lost the list data I previously had, and wished there was a way to recover them - leading to this feature)

**Data**: All data created in and stored by this extension are stored within the browser and nowhere else.

**Credit** to [kunalnarangtheone](https://github.com/kunalnarangtheone/) for naming the extension.

## Why was this written?

When applying online (endlessly) to jobs, I observed that most applications require you to paste multiple URLs (like LinkedIn, GitHub, etc). It was extremely frustrating to have to open a new tab, type the URL or find its bookmark, copy it, and switch back to the job application's tab again. 

And to do this for each URL it asks for - I wanted to improve this experience.

# How to use this extension

1. You will see this when it is opened for the first time. Hit the plus button to add a new text.

![Opened for the first time ever](https://github.com/amogh94/hashboard/blob/dark-mode/readme-images/InitialView.JPG "First Time")

2. Fill out the title and the text that you want to store, and click 'Save'. 

![Adding a new text](https://github.com/amogh94/hashboard/blob/dark-mode/readme-images/AddingFirstItem.JPG "Adding a new text")

3. Your content is now saved and visible. Whenever you open the extension from now on, you will see the following. Use the icons to edit the title or text (URL), copy the text (URL) to clipboard, or delete the entry.

![Added a new text](https://github.com/amogh94/hashboard/blob/dark-mode/readme-images/FirstItemAdded.JPG "Added a new text")

4. Add more entries, remove any entry, edit an entry, or copy to clipboard.
![Added more texts](https://github.com/amogh94/hashboard/blob/dark-mode/readme-images/MoreItemsAdded.JPG "Added more texts")

5. You can also search by title.

![Search by Title](https://github.com/amogh94/hashboard/blob/dark-mode/readme-images/SearchView.JPG "Search by Title")

6. Click the download icon to download all your data as a CSV.

7. Toggle Dark Mode as preferred.

![Dark Mode](https://github.com/amogh94/hashboard/blob/dark-mode/readme-images/DarkModeView.JPG "Dark Mode")

# How to install

- Download the zip file at [dist-zip](https://github.com/amogh94/hashboard/blob/master/dist-zip/hashboard-v1.0.0.zip).
- Extract the zip file into a folder of your choice.
- Type the following URL on the browser:
```
chrome://extensions
```
- Turn on 'Developer mode'.
- Click 'Load unpacked' button and select the extracted folder (hashboard-v1.0.0).

You should be able to see this extension on your browser toolbar now.

# Developer Guide

- NPM is a prerequisite.
- At the repository directory, run:
```
npm install
```

- Use the 'dist' folder to load the extension into the browser, instead of the unzipped folder mentioned above.  If you don't see the 'dist' folder yet, run:
```
npm run build
```

- Run the following command before you start working on any Vue component or `home.js`. This will automatically build the extension whenever you save a file, and ensures that it always stays upto date with your work.
```
npm run watch:dev
```
Alternatively, you can run `npm run build` to rebuild the extension manually.

In either scenario, you must be looking for the 'dist' folder to refresh whenever a component is changed.

- To generate the zip file (found in the [dist-zip](https://github.com/amogh94/hashboard/blob/master/dist-zip/) folder), run this command:
```
npm run build-zip
```


# Contribute

All forms of contributions are welcome, such as:
- CSS / UI Improvements
- Code review
- Feature suggestion

Please email me at asamogh94@gmail.com for any queries and suggestions.

# Resources
Thanks to [Hugo Alliaume](https://github.com/Kocal/vue-web-extension) for the boilerplate code for Vue in the context of extensions. 
