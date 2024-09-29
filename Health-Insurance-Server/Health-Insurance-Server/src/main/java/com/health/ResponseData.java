package com.health;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseData {

    public ResponseData(String fileName2, String downloadURl2, String contentType, long size) {
		// TODO Auto-generated constructor stub
	}
	private String fileName;
    private String downloadURL;
    private String fileType;
    private long fileSize;
}
