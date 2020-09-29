const app = require( "../index" );
const chai = require( "chai" );
const chaiHttp = require( "chai-http" );

const { expect } = chai;
chai.use( chaiHttp );

const candidateObject = {
    "id": "ae588a6b-4540-5714-bfe2-a5c2a65f547a",
    "name": "Sameh Hady",
    "skills": ["javascript", "es5", "nodejs", "express"]
};

describe( "App Testing", () =>
{
    it( "Create new candidate should return 200 status if success", done =>
    {
        chai
            .request( app )
            .post( "/candidates" )
            .set( 'Content-Type', 'application/json' )
            .send( candidateObject )
            .end( ( err, res ) =>
            {
                expect( res ).to.have.status( 200 );
                expect( res.body.title ).to.equals( "ok" );
                done();
            } );
    } );

    it( "Create new candidate should return 400 status if sent without body", done =>
    {
        chai
            .request( app )
            .post( "/candidates" )
            .set( 'Content-Type', 'application/json' )
            .send( {} )
            .end( ( err, res ) =>
            {
                expect( res ).to.have.status( 400 );
                expect( res.body.title ).to.equals( "ok" );
                done();
            } );
    } );

    it( "Search candidate should return 200 status with same candidate object", done =>
    {
        chai
            .request( app )
            .get( "/candidates/search?skills=javascript,express" )
            .end( ( err, res ) =>
            {
                expect( res ).to.have.status( 200 );
                expect( res.body.id ).to.equals( "ae588a6b-4540-5714-bfe2-a5c2a65f547a" );
                expect( res.body.name ).to.equals( "Sameh Hady" );
                expect( res.body.skills.length ).to.equals( 4 );
                done();
            } );
    } );

    it( "Search candidate should return 404 status if no candidates found", done =>
    {
        chai
            .request( app )
            .get( "/candidates/search?skills=java" )
            .end( ( err, res ) =>
            {
                expect( res ).to.have.status( 404 );
                done();
            } );
    } );

    it( "Search candidate should return 400 status if no skills passed", done =>
    {
        chai
            .request( app )
            .get( "/candidates/search" )
            .end( ( err, res ) =>
            {
                expect( res ).to.have.status( 400 );
                done();
            } );
    } );

    it( "Create new candidate with limited skills", done =>
    {
        chai
            .request( app )
            .post( "/candidates" )
            .set( 'Content-Type', 'application/json' )
            .send( {
                "id": "re588a6b-4540-5714-bfe2-a5c2a65f547b",
                "name": "Limited Skills",
                "skills": ["javascript"]
            } )
            .end( ( err, res ) =>
            {
                expect( res ).to.have.status( 200 );
                expect( res.body.title ).to.equals( "ok" );
                done();
            } );
    } );

    it( "Search candidate should return the right candidate with skills", done =>
    {
        chai
            .request( app )
            .get( "/candidates/search?skills=javascript,express" )
            .end( ( err, res ) =>
            {
                expect( res ).to.have.status( 200 );
                expect( res.body.id ).to.equals( "ae588a6b-4540-5714-bfe2-a5c2a65f547a" );
                expect( res.body.name ).to.equals( "Sameh Hady" );
                expect( res.body.skills.length ).to.equals( 4 );
                done();
            } );
    } );
} );
