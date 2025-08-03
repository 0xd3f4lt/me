<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';
require 'path/to/PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);
    
    try {
        // إعدادات السيرفر SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'yousefmohammad1710200300@gmail.com'; // بريد Gmail الخاص بك
        $mail->Password = 'Yousef1710@@'; // كلمة مرور Gmail أو رمز التطبيق (App Password)
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // المرسل والمستلم
        $mail->setFrom($email, $name);
        $mail->addAddress('yousefmohammad1710200300@gmail.com'); // البريد الذي سيتم إرسال الرسائل إليه

        // المحتوى
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = "Name: $name <br>Email: $email <br>Phone: $phone <br>Message: $message";

        $mail->send();
        echo 'The message has been sent successfully';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
