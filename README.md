#IOTA JSON API - Logvacinas#


Using the base of the master branch, here an adaptation is made in the body of the accepted request for a developed personal application.


**Requisities:**

*	Node 10.x or later
*	NPM 6.x or later


**To run app first time:**

1. Install the app dependencies:

		npm i

2. Create seed to create an IOTA The Tangle Address to send and find transactions, running this code in a unix based terminal to generate an 81 Tryte seed:

		cat /dev/urandom |LC_ALL=C tr -dc 'A-Z9' | fold -w 81 | head -n 1

3. Inside project directory create the .env file with the following variables, and paste the output of step 2 at IOTA_SEED variable:

		PORT_HTTP = 'Put here the number of the HTTP process port that you want runs the app, you can choose don't put this variable, in this case port 4000 will be used'
		PORT_HTTPS = 'Put here the number of the HTTPS process port that you want runs the app, you can choose don't put this variable, in this case port 5000 will be used'
		DOMAIN_SERVERCERT = 'If you want to use HTTPS, tell the address of fullchain.pem file in your system, you can choose don't put this variable, in this case only HTTP will be used'
		DOMAIN_SERVERKEY = 'If you want to use HTTPS, tell the address of privkey.pem file in your system, you can choose don't put this variable, in this case only HTTP will be used'
		IOTA_PROVIDER = 'URL of IOTA Tangle with the port to send JSON data, you can use the public tangle at address https://nodes.devnet.thetangle.org:443 for example'
		IOTA_SEED = 'Paste here the 81 Tryte seed generated in step 2'

4. Install the npm packages dependencies:

		npm start 

5. Now, you can request the route 'http://localhost:NUMBER_OF_PORT_HTTP_CHOOSEN/createAddress' for HTTP or 'https://localhost:NUMBER_OF_PORT_HTTPS_CHOOSEN/createAddress' for HTTPS to generate an IOTA address':

		{
			//empty body to use Seed of .env
		}

	or

		{
			seed: string
		}
		//To especify seed different of .env

6. Paste the output 'address' generated in step 5, in a new variable at .env file called IOTA_ADDRESS, the file will be look like this:

		PORT_HTTP = 'Put here the number of the HTTP process port that you want runs the app, you can choose don't put this variable, in this case port 4000 will be used'
		PORT_HTTPS = 'Put here the number of the HTTPS process port that you want runs the app, you can choose don't put this variable, in this case port 5000 will be used'
		DOMAIN_SERVERCERT = 'If you want to use HTTPS, tell the address of fullchain.pem file in your system, you can choose don't put this variable, in this case only HTTP will be used'
		DOMAIN_SERVERKEY = 'If you want to use HTTPS, tell the address of privkey.pem file in your system, you can choose don't put this variable, in this case only HTTP will be used'
		IOTA_PROVIDER = 'URL of IOTA Tangle with the port to send JSON data, you can use the public tangle at address https://nodes.devnet.thetangle.org:443 for example'
		IOTA_SEED = 'Paste here the 81 Tryte seed generated in step 2'
		IOTA_PROVIDER = 'Paste here the address generated in step 5'

7. Restart the app, to changes in .env file make effect

8. Now, We I'll send JSON data to IOTA Tangle using the route 'http://localhost:NUMBER_OF_PORT_HTTP_CHOOSEN/transaction' for HTTP or 'https://localhost:NUMBER_OF_PORT_HTTPS_CHOOSEN/transaction' for HTTPS, we can send JSONs of any format of body, like the following example.

		{
			"example1": "Its easy work with the tangle",
			"example2": 100,
			"example3": [1, 2, 3]
		}

9. For finish, we can find all transactions sent at the configurated address using the route 'http://localhost:NUMBER_OF_PORT_HTTP_CHOOSEN/findAll' for HTTP or 'https://localhost:NUMBER_OF_PORT_HTTPS_CHOOSEN/findAll' for HTTPS

		{
			//empty body to use address of .env
		}

	or

		{
			address: string
		}
		//To especify address different of .env


Note: the app also can be executed runnig the following test command with nodemon:

		npm test
