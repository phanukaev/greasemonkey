// ==UserScript==
// @name       Playlist Info Download
// @include    https://music.youtube.com/*
// @grant      none
// @version    1.1
// ==/UserScript==


const get_playlist_data = () => {
  const extract_data = (d) => {
    let retval = {};
    let titlec = d.querySelector('a') || d.querySelector('.title-column')
    retval.title = titlec.textContent.trim();
    retval.url = (titlec.href ?? "").replace(/&.+/, '');
    [retval.artist, _, retval.album] =
      d.querySelector('.secondary-flex-columns')
    	.textContent
    	.trim()
    	.split('\n')
    	.filter(t => t !== '').map(t => t.trim())
    return retval;
  }
  const res_array = Array();
  document.querySelectorAll('ytmusic-playlist-shelf-renderer div.flex-columns')
  	.forEach(x => res_array.push(extract_data(x)));
  return JSON.stringify(res_array, null, 2);
}

const get_playlist_title = () =>
      document
      .querySelector('h2.ytmusic-responsive-header-renderer')
      .textContent
      .trim()

const run_downloader = () => {
    let el = document.createElement('a');
    el.download = get_playlist_title() + '.json';
    el.href =
        'data:text/plain;charset=utf-8,'
        + encodeURIComponent(get_playlist_data());
    el.style.display = 'none';
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
}
    
let db_wrapper = document.createElement('div')
db_wrapper.style.display = 'flex';
db_wrapper.style.justifyContent = 'center';
db_wrapper.style.marginTop = '3ex';

let download_button = document.createElement('button');
download_button.textContent = 'Download Info';
download_button.addEventListener('click', (event) => {
    run_downloader();
});

db_wrapper.appendChild(download_button);

document
    .querySelector('ytmusic-responsive-header-renderer')
    .appendChild(db_wrapper);
