The Node Express server is setup to query a locally-running MySQL Server.
We implemented this server as a Window's Service by using the MySQL installer wizard.

Once the server was listening / running, we used MySQL Workbench (also downloaded
from the installer wizard) to create a database on the server.

We did not fully implement the database into our project due to complications of
of communication between our Node Express server and MySQL server.