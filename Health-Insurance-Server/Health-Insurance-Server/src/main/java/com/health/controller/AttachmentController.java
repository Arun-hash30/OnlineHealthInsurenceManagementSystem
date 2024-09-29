package com.health.controller;

import org.springframework.beans.factory.annotation.Autowired;
/*
import com.health.fileuploads.ResponseData;



import com.health.fileuploads.Attachment;
import com.health.fileuploads.AttachmentService;*/
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.health.ResponseData;
import com.health.model.Attachment;
import com.health.model.User;
import com.health.service.AttachmentService;
import com.health.service.UserService;
import java.awt.*;
import java.util.List;

@RestController
@RequestMapping("/api/attachment")
@CrossOrigin(origins = "http://localhost:5173")
public class AttachmentController {

	private AttachmentService attachmentService;
	@Autowired
	private UserService userService;

	public AttachmentController(AttachmentService attachmentService) {
		this.attachmentService = attachmentService;
	}

	@GetMapping("/users")
	public List<User> getAllUsers() {
		return userService.getAllUsers();
	}

	@PostMapping("/upload")
	public ResponseData uploadFile(@RequestParam("file") MultipartFile file) throws Exception {
		Attachment attachment = null;
		String downloadURl = "E:\\EXCELR\\storage\\";
		attachment = attachmentService.saveAttachment(file);
		  System.out.println("inside the postmapping - upload 1  : - " + attachment);
		  System.out.println("inside the postmapping - upload 1  : - " + attachment.getFileName() + ":"+ file.getContentType()+ ":" + file.getSize());
			
		downloadURl = ServletUriComponentsBuilder.fromCurrentContextPath().path("/download/").path(attachment.getId())
				.toUriString();
		  System.out.println("inside the postmapping - upload 2: - " + downloadURl);
		return new ResponseData(attachment.getFileName(), downloadURl, file.getContentType(), file.getSize());
	}

	@GetMapping("/download/{fileId}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileId) throws Exception {
		Attachment attachment = null;
		attachment = attachmentService.getAttachment(fileId);
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(attachment.getFileType()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + attachment.getFileName() + "\"")
				.body(new ByteArrayResource(attachment.getData()));
	}

}