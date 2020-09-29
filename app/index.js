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
    }else{
        res.status('400');
    }
    res.send( { title: 'ok' } );
} );

app.get( '/candidates/search', function( req, res )
{
    let found = {};
    if(req.query.skills)
    {
        found = database.candidates.map( ( candidate ) =>
        {
            candidate.skillsCount = candidate.skills.filter( ( s ) =>
            {
                return (req.query.skills.split( s ).length - 1) > 0;
            } ).length;
            return candidate;
        } ).sort( ( a, b ) =>
        {
            return b.skillsCount - a.skillsCount;
        } );

        found = found.find( ( f ) =>
        {
            return f.skillsCount !== 0;
        } );

        if( found )
        {
            delete found.skillsCount;
        }
        else
        {
            res.status( '404' );
        }
    }else{
        res.status('400');
    }
    res.send( found || {})
} );

app.listen( port, () =>
{
    console.log( `Example app listening at http://localhost:${port}` )
} );

module.exports = app;
