const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var ArtistSchema = Schema({
	id_artist: String,
	external_urls: { spotify: String },
	href: String,
	name: String,
	popularity: Number,
	type: String,
	uri: String
});

const SongSchema = Schema({
	id: {
		type: String,
		unique: true
	},
	disc_number: Number,
	duration_ms: Number,
	explicit: Boolean,
	external_urls: {
		spotify: String
	},
	href: String,
	is_local: Boolean,
	is_playable: Boolean,
	name: String,
	preview_url: String,
	track_number: Number,
	type: String,
	uri: String,

	artists: [ ArtistSchema ]
});


const Song = mongoose.model('Song', SongSchema);


module.exports = Song;
