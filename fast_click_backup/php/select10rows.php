<?php
$con=mysqli_connect("localhost","root","","users");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$result = mysqli_query($con,"select   NAME , SCORE  from usersscores order by score desc limit 8");

echo "<table border='2'>
<tr>
<th>NAME</th>
<th>SCORE</th>
</tr>";

while($row = mysqli_fetch_array($result))
  {
  echo "<tr>";
  echo "<td>" . $row['NAME'] . "</td>";
  echo "<td>" . $row['SCORE'] . "</td>";
  echo "</tr>";
  }
echo "</table>";

mysqli_close($con);
?>