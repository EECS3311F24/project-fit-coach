public class Backend {
	public static void main(String[] args) {
		// used for handling exceptions and doesn't let the program crash
		try {
		// creating our server socket to run our backend server
		java.net.ServerSocket mySocket = new java.net.ServerSocket(8080);
		boolean runServer = true;
		
		// Will always run as long as the server is running
		while(runServer) {
			// creating a socket for our user and accepting them to a socket
			java.net.Socket userSocket = mySocket.accept();
			// the user at a specific socket will be able to receive text responses from our backend server
			java.io.PrintWriter outputResponse = new java.io.PrintWriter(userSocket.getOutputStream(), runServer);
			outputResponse.println("Welcome to our server");
			userSocket.close();
		}
		mySocket.close();
		
		} catch(Exception e) {
			// used mainly for debugging any errors
			e.printStackTrace(); 
		}
	}

}