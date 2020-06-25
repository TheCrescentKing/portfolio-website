package uk.co.pm.model;

import java.util.List;

public class CSV {
	// Delimiter used in CSV file
	private static final String COMMA_DELIMITER = ",";
	private static final String NEW_LINE_SEPARATOR = "\r\n";

	private static String FILE_HEADER = "";
	static String delims = "[,=]+";

	public void setHeader(String head) {
		FILE_HEADER = head;
	}

	public <E> String writeCsvFile(String fileName, List<E> data) {
		String fileContent;
		StringBuilder writer = null;
		String[] elements = new String[data.size()];

		int index = 0;
		for (Object value : data) {
			elements[index] = String.valueOf(value);
			index++;
		}

		try {
			writer = new StringBuilder(FILE_HEADER + NEW_LINE_SEPARATOR);
			// Write the CSV file header
			
			// Write to the CSV file
			for (String e : elements) {
				String[] tokens = e.split(delims); // tokenize
				for (int i = 1; i < tokens.length; i = i + 2) { // skip useless info

					tokens[i] = tokens[i].replaceAll("'", "");
					if (tokens[i].contains("}")) {
						tokens[i] = tokens[i].replaceFirst("}", "\r\n"); // new line for both NotePad and Excel
						writer.append(tokens[i]);
					} else {
						writer.append(tokens[i]);
						writer.append(COMMA_DELIMITER);
					}
				}
			}

		} catch (Exception e) {
			System.out.println("Error in CsvStringBuilder !!!");
			e.printStackTrace();
//		} finally {
//			try {
//				fileWriter.flush();
//				fileWriter.close();
//			} catch (IOException e) {
//				System.out.println("Error while flushing/closing fileWriter !!!");
//				e.printStackTrace();
//			}
			
		}
		fileContent=writer.toString();
		return fileContent;
	}

}
