import React, { Component } from 'react';
import $ from 'jquery';

var checkboxitem = [];
var librarydata  = [];
var playlistdata = [];
class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      playlistresult : '',
      items: [],
      playlistitems : []
    };
    this.globalsearch = this.globalsearch.bind(this);
    this.globalsearchplaylist = this.globalsearchplaylist.bind(this);
    this.getComponent = this.getComponent.bind(this);
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

    getComponent(event) {
        if(checkboxitem.length === 0){
          alert('kindly select any checkbox');
        }
        else if($('#inputplaylistname').val() == '' && $('#inputplaylistname').val() == undefined){
          alert('kindly fill the playlist name');
        }
        else{
            var playlistids = checkboxitem.join(',');
            var playlistname = $('#inputplaylistname').val();
            var submitdata = {'postsong': playlistids,'postname':playlistname};
            fetch('http://localhost:5000/playlistentry/'+playlistname+'/'+playlistids, {
              method: 'GET'
            }).then(res => res.json())
              .then(response => {
                this.setState({playlistresult : response.entryresult});
                location.reload();
            });
        }
    }
    
    checkboxClick(event){
      if(checkboxitem.indexOf(event) === -1){
        checkboxitem.push(event);
      }else{
        var inputevent = event;
        var filterresult = [];
        checkboxitem.map((filterdata,key) => { 
          if(filterdata !== inputevent && filterdata !== undefined){
              filterresult.push(filterdata); 
          }
           if(checkboxitem.length-1 === key){ checkboxitem = []; checkboxitem = filterresult; console.log(checkboxitem);} 
          return 0;
        });
      }
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
          
          var playsearchresult = playlistdata.filter((obj) => {
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
              playlistitems: playsearchresult
          });
      }

  render() {
  	 const { items,playlistitems,playlistresult } = this.state;
    return (
    	<div className="App">
    	  <center><h1>Library List Page</h1></center> 
	      <div className="container">
          <h1>{this.state.playlistresult}</h1>
	      	<label>Search All Fields &nbsp;&nbsp;&nbsp;</label>
	      	<input type="text" className="inputwidth" name="inputname" placeholder="ID / Album / Artist / Duration" onChange={this.globalsearch} /><br/>
           <div className="row mt-5">
                <div className="col-lg-5 mb-5 grid-margin"></div>
                <div className="col-lg-3 mb-3 grid-margin"><input type="text" name="inputplaylistname" id="inputplaylistname"/></div>
                <div className="col-lg-3 mb-3 grid-margin">
                  <input type="submit" onClick={e => this.getComponent(e)} value="Save To Playlist" />
                </div>
                <div className="col-lg-12 mb-12 grid-margin">
		             {items.map(item => (
		                <div className="col-lg-10 mb-10 grid-margin">
			                <div className="card h-100">
			                    <h4 className="card-header">Title : {item.title} ID : {item.id}</h4>
			                    <div className="card-body">
			                      <p className="card-text">Album Name : {item.album}</p>
			                      <p className="card-text">Artist Name : {item.artist}</p>
			                      <p className="card-text">Time Duration : {item.duration}</p>
                            <label><input type="checkbox" id="checkboxrow_{item.id}" className="largerCheckbox" onClick={e => this.checkboxClick(item.id)}/> Add to Playlist</label>
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

export default About;