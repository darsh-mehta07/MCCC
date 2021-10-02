<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class TermsConditionModel extends Model
{
    protected $table = 'terms_conditions';
    protected $fillable = ['title', 'description'];
}
