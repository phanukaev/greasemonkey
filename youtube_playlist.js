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
      document.querySelector('.metadata > h2').textContent.trim();

download_button = document.createElement('a');
'.detail-page-menu > div:nth-child(1)'
download_button.setAttribute(
    'style',
    `font-size: 12pt; 
    text-align: center; 
    color: black;
    vertical-align: bottom;
    background: white;
    border-radius: 20px;
    padding: 8px 10px 0 10px;`);


download_button.textContent = 'Download Info';

download_button.setAttribute (
    'href',
    'data:text/plain;charset=utf-8,'
        + encodeURIComponent(get_playlist_data()));

download_button.setAttribute('download', get_playlist_title() + '.json' );

document.querySelector('#top-level-buttons').appendChild(download_button);
