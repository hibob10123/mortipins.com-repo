<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $username = htmlspecialchars($_POST['username']);
    $link = htmlspecialchars($_POST['link']);
    $rank = htmlspecialchars($_POST['rank']);

    // Validate form data (optional)
    if (empty($username) || empty($link) || empty($rank)) {
        echo "All fields are required.";
        exit;
    }

    // Process the form data (e.g., save to database, send email, etc.)
    // For this example, we'll just display the data
    echo "Username: " . $username . "<br>";
    echo "YouTube Link: " . $link . "<br>";
    echo "Rank: " . $rank . "<br>";

    // Redirect to a thank you page
    header("Location: thankyou.html");
    exit;
}
?>