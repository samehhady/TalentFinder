const express = require( 'express' );
const app = express();
const port = 3000;
var database = { candidates: [] };

app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );


app.post( '/candidates', ( req, res ) =>
{
    if( req.body && req.body.id )
    {
        let candidate = { id: req.body.id, name: req.body.name, skills: req.body.skills };
        database.candidates.push( candidate );
    }
    else
    {
        res.status( '400' );
    }
    res.send( { title: 'ok' } );
} );

app.get( '/candidates/search', function( req, res )
{
    let found = {};
    let byTargetSkillsLength = ( a, b ) =>
    {
        let aTargetSkills = a.skills.filter( skill => req.query.skills.split( ',' ).includes( skill ) );
        let bTargetSkills = b.skills.filter( skill => req.query.skills.split( ',' ).includes( skill ) );
        if( aTargetSkills.length < bTargetSkills.length )
        {
            return 1;
        }
        if( aTargetSkills.length > bTargetSkills.length )
        {
            return -1;
        }
        return 0;
    };

    if( req.query.skills )
    {
        found = database.candidates.sort( byTargetSkillsLength )[0];

        let check = found.skills.find( s => req.query.skills.split( ',' ).includes( s ) );

        if( !check )
        {
            res.status( '404' );
            found = {};
        }
    }
    else
    {
        res.status( '400' );
    }
    res.send( found || {} )
} );

app.listen( port, () =>
{
    console.log( `Example app listening at http://localhost:${port}` )
} );

module.exports = app;
