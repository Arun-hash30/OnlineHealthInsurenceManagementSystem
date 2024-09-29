package com.health.model;


import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
@Data@NoArgsConstructor
public class Attachment {

      

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private String id;
    
    private String fileName;
    private String fileType;

    @Lob
    private byte[] data;

       
    public String getId() {
        return id;
    }


	public String getFileName() {
		return fileName;
	}



	public String getFileType() {
		return fileType;
	}



	public byte[] getData() {
		return data;
	}



	public Attachment(String id, String fileName, String fileType, byte[] data) {
		super();
		this.id = id;
		this.fileName = fileName;
		this.fileType = fileType;
		this.data = data;
	}


	
}