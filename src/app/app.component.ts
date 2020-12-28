import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'tdrive';
  tree : any[] = new Array();
  folder: any[];
  path: string = "Folders";
  filerenamer : number;
  folderrenamer : string;
  
  constructor() {
	this.tree[0] = "file1";
	this.tree[1] = "file2";
	this.tree["folder0"] = new Array();
	this.tree["folder0"][0] = "file01";
	this.tree["folder0"][1] = "file02";
	this.tree["folder0"]["folder00"] = new Array();
	this.tree["folder0"]["folder00"][0] = "file001";
	this.tree["folder0"]["folder00"][1] = "file002";
	
	this.folder = this.tree;
  }
  public ToggleExplore() {
	document.getElementById("explorer").classList.toggle("open");
  };
  public toggleList(index:number) {
	document.getElementById("parent"+index).classList.toggle("caret-down");
	document.getElementById("branch"+index).classList.toggle("closelist");
  };
  public checkIfArray(ele) {
	if (ele.value instanceof Array) return true;
	else return false;
  }
  public changeFolder (foldername:string) {
	this.folder = this.folder[foldername];
	this.path += " > "+foldername; 
  }
  public backpress() {
	var destArr = this.path.split(" > ");
	if ( destArr.length > 1 ) {
	  destArr.pop();
	  if ( destArr.length > 1 ) {
		var interArr : any[] = this.tree;
		for (var i =1;i<destArr.length;i++) {
		  interArr = interArr[destArr[i]];
		}
		this.folder = interArr;
		this.path = destArr.join(" > ");
	  }
	  else { 
		this.folder = this.tree;
		this.path = "Folders";
	  }
	}
  }
  public showaddFolder () {
	document.getElementById("modal").style.display = "block";
	document.getElementById("addFolderInput").style.display = "block";
  }
  public addFolder () {
	var foname = (<HTMLInputElement>document.getElementById("InputFoldername")).value;
	foname = foname.toLowerCase();
	foname = foname.trim();
	if( foname != "" ) {
	  if ( typeof this.folder[foname] == 'undefined' ) {
	    this.folder[foname] = new Array();
	  } else alert("A folder with that name already exists");
	} else alert("Enter a Folder name please");
	(<HTMLInputElement>document.getElementById("InputFoldername")).value = "";
	this.closemodal();
  }
  public showaddFile () {
	document.getElementById("modal").style.display = "block";
	document.getElementById("addFileInput").style.display = "block";
  }
  public addFile () {
	var effname = (<HTMLInputElement>document.getElementById("InputFilename")).value;
	effname = effname.toLowerCase();
	effname = effname.trim();
	var c : boolean = true;
	this.folder.forEach(function(x){
	  if ( effname == x ) c = false;
	});
	if( effname != "" ) {
	   if (c) { 
		this.folder.push(effname);
	   } else alert("A file with that name already exists");
	} else alert("Enter a File name please");
	(<HTMLInputElement>document.getElementById("InputFilename")).value = "";
	this.closemodal();
  }
  public deleteFile(key:number) {
	this.folder.splice(key,1);
  }
  public deleteFolder(key:string) {
	delete this.folder[key];
  }
  public showRenameFile(key:number) {
	this.filerenamer = key;
	document.getElementById("modal").style.display = "block";
	document.getElementById("renameFileInput").style.display = "block";
  }
  public renameFile() {
	var effname = (<HTMLInputElement>document.getElementById("InputFileRename")).value;
	effname = effname.toLowerCase();
	effname = effname.trim();
	var c : boolean = true;
	this.folder.forEach(function(x){
	  if ( effname == x ) c = false;
	});
	if( effname != "" ) {
	   if (c) { 
		this.folder[this.filerenamer] = effname;
	   } else alert("A file with that name already exists");
	} else alert("Enter a File name please");
	(<HTMLInputElement>document.getElementById("InputFileRename")).value = "";
	this.closemodal();
  }
  public showRenameFolder(key:string) {
	this.folderrenamer = key;
	document.getElementById("modal").style.display = "block";
	document.getElementById("renameFolderInput").style.display = "block";
  }
  public renameFolder() {
	var foname = (<HTMLInputElement>document.getElementById("InputFolderRename")).value;
	foname = foname.toLowerCase();
	foname = foname.trim();
	if( foname != "" ) {
	  if ( typeof this.folder[foname] == 'undefined' ) {
	    this.folder[foname] = this.folder[this.folderrenamer];
		delete this.folder[this.folderrenamer] ;
	  } else alert("A folder with that name already exists");
	} else alert("Enter a Folder name please");
	(<HTMLInputElement>document.getElementById("InputFolderRename")).value = "";
	this.closemodal();
  }
  public closemodal() {
	document.getElementById("modal").style.display = "none";
	document.getElementById("addFileInput").style.display = "none";
	document.getElementById("addFolderInput").style.display = "none";
	document.getElementById("renameFileInput").style.display = "none";
	document.getElementById("renameFolderInput").style.display = "none";
  }
}