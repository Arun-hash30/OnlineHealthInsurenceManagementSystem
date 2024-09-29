package com.health.controller;


// Importing required classes 
import java.io.File; 
import java.io.FileInputStream; 
import java.io.FileNotFoundException; 
import java.io.FileOutputStream; 
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.core.io.InputStreamResource; 
import org.springframework.http.HttpHeaders; 
import org.springframework.http.HttpStatus; 
import org.springframework.http.MediaType; 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping; 
import org.springframework.web.bind.annotation.RequestMethod; 
import org.springframework.web.bind.annotation.RequestParam; 
import org.springframework.web.bind.annotation.RestController; 
import org.springframework.web.multipart.MultipartFile;

import com.health.model.User;
import com.health.service.UserService; 


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/files1")


public class FileController { 
	@Autowired
	private UserService userService;
	
	
	@GetMapping("/users")
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}
	
	// Uploading a file 	
	@PostMapping("/upload") 
	public String uploadFile(@RequestParam("file") MultipartFile file){ 

		// Setting up the path of the file 
		String filePath = System.getProperty("user.dir") + "/Uploads" + File.separator + file.getOriginalFilename(); 
		String fileUploadStatus; 
		
		// Try block to check exceptions 
		try { 
			
			// Creating an object of FileOutputStream class 
			FileOutputStream fout = new FileOutputStream(filePath); 
			fout.write(file.getBytes()); 
			
			// Closing the connection 
			fout.close(); 
			fileUploadStatus = "File Uploaded Successfully"; 
			
		} 
		
		// Catch block to handle exceptions 
		catch (Exception e) { 
			e.printStackTrace(); 
			fileUploadStatus = "Error in uploading file: " + e; 
		} 
		return fileUploadStatus; 
	} 
	
	// Getting list of filenames that have been uploaded 
	@GetMapping("/getFiles")
	public String[] getFiles() 
	{ 
		String folderPath = System.getProperty("user.dir") +"/Uploads"; 
		
		// Creating a new File instance 
		File directory= new File(folderPath); 
		
		// list() method returns an array of strings 
		// naming the files and directories 
		// in the directory denoted by this abstract pathname 
		String[] filenames = directory.list(); 
		
		// returning the list of filenames 
		return filenames; 
		
	} 
	
	// Downloading a file 
	@GetMapping("/download/{path:.+}") 
	public ResponseEntity downloadFile(@PathVariable("path") String filename) throws FileNotFoundException { 
	
		// Checking whether the file requested for download exists or not 
		String fileUploadpath = System.getProperty("user.dir") +"/Uploads"; 
		String[] filenames = this.getFiles(); 
		boolean contains = Arrays.asList(filenames).contains(filename); 
		if(!contains) { 
			return new ResponseEntity("FIle Not Found",HttpStatus.NOT_FOUND); 
		} 
		
		// Setting up the filepath 
		String filePath = fileUploadpath+File.separator+filename; 
		
		// Creating new file instance 
		File file= new File(filePath); 
		
		// Creating a new InputStreamResource object 
		InputStreamResource resource = new InputStreamResource(new FileInputStream(file)); 
		
		// Creating a new instance of HttpHeaders Object 
		HttpHeaders headers = new HttpHeaders(); 
		
		// Setting up values for contentType and headerValue 
		String contentType = "application/octet-stream"; 
		String headerValue = "attachment; filename=\"" + resource.getFilename() + "\""; 
			
		return ResponseEntity.ok() 
				.contentType(MediaType.parseMediaType(contentType)) 
				.header(HttpHeaders.CONTENT_DISPOSITION, headerValue) 
				.body(resource); 
		
	} 
}
