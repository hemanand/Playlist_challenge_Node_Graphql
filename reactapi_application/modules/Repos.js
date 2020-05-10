import React, { Component } from 'react';
import $ from 'jquery';

var checkboxitem = [];
var librarydata  = [];
var playlistdata = [];

class Repos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playlistresult : '',
      isLoaded: false,
      items: [],
      playlistitems : []
    };
    this.globalsearch = this.globalsearch.bind(this);
    this.globalsearchplaylist = this.globalsearchplaylist.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5000/librarylist")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
          librarydata = result;
          console.log(this.state.items);
      });

      fetch("http://localhost:5000/playlist")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            playlistitems: result
          });
        playlistdata = result;
      });
  }

    deleteplaylist(event) {
      var deleteid = event;
      fetch('http://localhost:5000/playlistdelete/'+deleteid, {
        method: 'GET'
      }).then(res => res.json())
        .then(response => {
          this.setState({playlistresult : "Play list Item "+event+" Deleted Successfully!!!.."});
          location.reload();
      });
    }

    globalsearch(event){
          var textfieldvalue = event.target.value.toLowerCase();
          var searchresult = librarydata.filter((obj) => {
            var flag = false;
            Object.values(obj).forEach((val) => { 
              if(String(val).toLowerCase().indexOf(textfieldvalue) > -1) {
                flag = true;
                return obj;
              }    
            });
            if(flag) return obj;
          });
          this.setState({
              isLoaded: true,
              items: searchresult
          });
      }

      globalsearchplaylist(event){
        var textfieldvalue = event.target.value.toLowerCase();
          var playsearchresult = playlistdata.filter((obj,objkey) => {
            var flag = false;
            if(objkey == textfieldvalue){
              Object.values(obj).forEach((val,key) => { 
                if(String(val).toLowerCase().indexOf(textfieldvalue) > -1) {
                  flag = true;
                  return obj;
                }    
              });
            }
            if(flag) return obj;
          });
          if(textfieldvalue == '' || textfieldvalue == undefined){
            this.setState({
              isLoaded: true,
              playlistitems: playlistdata
            });
          }else{
            this.setState({
              isLoaded: true,
              playlistitems: playsearchresult
            });
          }
      }

  render() {
     const { items,playlistresult,playlistitems } = this.state;
    return (
      <div className="App">
        <center><h1>Play List Page</h1></center> 
        <div className="container">
          <label>Search &nbsp;&nbsp;&nbsp;</label>
          <input type="text" className="inputwidth" name="inputname" placeholder=" Search Play List ID Only " onChange={this.globalsearchplaylist} /><br/>
           <div className="row mt-5">
                <h2>{this.state.playlistresult}</h2>
                <div className="col-lg-12 mb-12 grid-margin">
                 {playlistitems.map(item => (
                    <div className="col-lg-10 mb-10 grid-margin">
                      <div className="card h-100">
                          <h4 className="card-header">ID : {item.id}</h4>
                          <div className="card-body">
                            <p className="card-text">Album Name : {item.name}</p>
                            <p className="card-text">songs ID : {item.songs}</p>
                            <p><input type="submit" onClick={e => this.deleteplaylist(item.id)} value="Delete To Playlist" /></p>
                          </div>
                      </div>
                      <br/>                     
                  </div>
                  ))}
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Repos;