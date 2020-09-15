const SpotifyWebApi = require('spotify-web-api-node');

require('./database');
const mongoose = require('mongoose');
const Song = require('./models/song');

const args = process.argv.slice(2);

const client_id = 'a44678dd49cc402b903fb87d28fe4c9e'; // Your client id
const client_secret = '976533bb885744c4abe9a5b4cdbe7c05'; // Your secret


/**
 * Artists ids: RHCP - Led Zeppelin - The beatles	- Pearl Jam
 * 0L8ExT028jH3ddEcZwqJJ5 36QJpDe2go2KgaRleHCDTp 3WrFJ7ztbogyGnTHbHJFl2 1w5Kfo2jwwIPruYS2UWh56
 */

// Create the api object with the credentials
const spotifyApi = new SpotifyWebApi({
	clientId: client_id,
	clientSecret: client_secret
});

const main = () => {
	spotifyApi.clientCredentialsGrant().then(
		//Creates a connection with spotify. It returns the access token.
		async function(data) {
			// Save the access token so that it's used in future calls
			spotifyApi.setAccessToken(data.body['access_token']);
			console.log('Token obtenido');
			for (let i = 0; i < args.length; i++) {
				await getAllTracks(args[i]);
			}
		},
		function(err) {
			console.log('Something went wrong when retrieving an access token', err);
		}
	);
};


const getAllTracks = async (artistId) => {
	console.log('Buscando canciones de ', artistId+'...');
	const data = await spotifyApi.getArtistAlbums(artistId).catch((e) => console.log(e));
	let tracks = await Promise.all(
		data.body.items.map(async (album) => {
			const r = await spotifyApi.getAlbumTracks(album.id).catch((e) => console.log(e));
			return r.body.items;
		})
	);
	tracks = [].concat.apply([], tracks);
	console.log(tracks.length, 'canciones encontradas!');
	postTracks(tracks);
};

const postTracks = async (tracks) => {
	console.log('Guardando canciones encontradas en bd local...');

	const tracksNew = tracks.map((track) => {
		return new Song({
			artists: track.artists,
			id: track.id,
			disc_number: track.disc_number,
			duration_ms: track.duration_ms,
			explicit: track.explicit,
			external_urls: track.external_urls,
			href: track.href,
			is_local: track.is_local,
			is_playable: track.is_playable,
			name: track.name,
			preview_url: track.preview_url,
			track_number: track.track_number,
			type: track.type,
			uri: track.uri
		});
	});

	await Song.insertMany(tracksNew).catch((e) => console.log('Error al insertar algunas canciones. Clave duplicada?'));
	console.log('Canciones guardadas localmente con exito!');

	if (tracks[0].artists[0].id === args[args.length - 1]) {
		mongoose.connection.close();
		console.log('Termino ultimo artista');
	}
};

main();
