<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class HelpMcccModel extends Model
{
    protected $table = 'help_mccc';
    protected $fillable = ['title', 'description'];
}
