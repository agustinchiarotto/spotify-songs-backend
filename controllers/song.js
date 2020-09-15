const Song = require('../models/song');

/**
 * Get all songs of an artist. 
 * req.query.limit = The number of songs to return. If it is 0 is unlimited.
 * req.query.skip = The number of songs to ignore before start counting (offset)
 * artistName = req.query.artistName;
 */
const getSongsByArtistName = async (req, res) => {
	const limit = req.query.limit ? parseInt(req.query.limit) : 0;
	const skip = req.query.skip ? parseInt(req.query.skip) : 0;

	const artistName = req.query.artistName ? req.query.artistName : '';	
	const result = await Song.find(
		{ 'artists.name': { $regex: artistName, $options: 'i' } },
		{ id: 'songId', name: 'songTitle', _id: 0 }
	)
		.skip(skip)
		.limit(limit)
		.catch((err) => {
			return res.status(400).json({
				title: 'Error',
				error: err
			});
		});
	
	res.status(200).json({
		songs: result
	});
};

const getSongById = async (req, res) => {
	console.log('getby id con: ', req.params.songId);
	const result = await Song.find({
		id: req.params.songId
	}).catch((err) => {
		return res.status(400).json({
			title: 'Error',
			error: err
		});
	});
	if (!result || result.length === 0) {
		return res.status(404).json({
			message: 'Song not found'
		});
	}
	res.status(200).json({
		result
	});
};

// EXPORT
module.exports = {
	getSongsByArtistName,
	getSongById
};
