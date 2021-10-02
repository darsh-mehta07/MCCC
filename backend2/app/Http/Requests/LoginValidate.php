<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginValidate extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email_or_mobile'     => 'required|max:28',
            'password'  => 'required|min:6|max:8',
        ];
    }
    
    public function messages()
    {
        return [
            'email_or_mobile.required' => 'Please Enter Your Email or Mobile Number.',
            'password.required' => 'Please Enter the Password.',
            ];
    }
}
