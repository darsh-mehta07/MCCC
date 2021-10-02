<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetCityValidation extends FormRequest
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
            'state_id' => 'required|numeric'
        ];
    }
    
    public function messages()
    {
        return [
        'state_id.required'        => 'state id is required',
        'state_id.numeric'         => 'state id should only be in numbers'
        ];
    }
}
