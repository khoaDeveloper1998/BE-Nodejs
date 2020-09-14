// During the test the env variable is set to test 
process.env.NODE_ENV = 'test';
//decribe: a logical grouping of tests,"Simple Math Test"
// it -- a single test, "it.. should return x"
// Require the dev-dependencies
let chaiHttp = require('chai-http');
let app = require('../src/app');
let chai = require('chai');
let should = chai.should();
chai.use(chaiHttp);

describe('Test Station', () => {
    beforeEach((done) => {
        //Before each test we empty the database in your case
        done();
    })
    describe('/GET stations', () => {
        it('should get all stations', (done) => {
            chai.request(app)
                .get('/stations')
                .end((err, res) => {
                    res.should.have.status(200);
                    console.log("res.body = " + res.body);
                    done();
                })
        })
    })
    describe('/POST a station', () => {
        it('should return created station record', (done) => {
            let station = {
                id: "new station",
                last_run: "2020-10-20",
                histo_flag: 1,
                realtime_flag: 0,
            }
            console.log(station);
            chai.request(app)
                .post("/station")
                .send(station)
                .end((err, res) => {
                    if(res){
                    res.should.have.status(200)}
                    else{
                    console.log(err);
                }
                done();
                })
        })
    })
    describe('/Put a station', () => {
        it('should return updated station record', (done) => {
            let id = "new station";
            let rqstation = {
                id: "updated station record",
                last_run: "2020-10-20",
                histo_flag: 1,
                realtime_flag: 0,
            }
            chai.request(app)
                .put("/station/" + id)
                .send(rqstation)
                .end((err, res) => {
                    if(res){
                    res.should.have.status(200)}
                    else{
                    console.log(err);
                }
                done();
                })
        })
    })
    describe('/GET/:id station', () => {
        it('should return station with the given id ', (done) => {
            // id = 1234
            const id = "new record 1";
            chai.request(app)
                .get('/station/' + id)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').eql('new record 1');
                    res.body.should.have.property('histo_flag').eql(0);
                    res.body.should.have.property('realtime_flag').eql(1);
                    done();
                })

        })
    })
})
