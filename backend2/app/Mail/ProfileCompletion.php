<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ProfileCompletion extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $subject = 'Your Profile Completed On MCCC';
        $address = 'bablu.wdipl@gmail.com';
        $name    =     'MCCC';
        return $this->view('email.profile-complete')
                    ->from($address, $name)
                    ->subject($subject);
    }
}
