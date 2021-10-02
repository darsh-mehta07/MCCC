<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EventRegistration extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $user;
    public $profile;
    public $eventdata;
    public $subjectForUser;
    
    public function __construct($user,$profile,$eventdata,$subjectForUser)
    {
        $this->user            = $user;
        $this->profile         = $profile;
        $this->eventdata       = $eventdata;
        $this->subjectForUser  = $subjectForUser;
        
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $subject = $this->subjectForUser;
        $address = 'bablu.wdipl@gmail.com';
        $name    =     'MCCC';
        return $this->view('email.event-training')
                    ->from($address, $name)
                    ->subject($subject);
    }
}
