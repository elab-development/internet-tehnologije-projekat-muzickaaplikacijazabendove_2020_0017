<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSongRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'duration' => 'required|regex:/^([0-9]{1,2}):[0-5][0-9]$/', // Format MM:SS
            // 'duration' => 'required|string|max:255',
            'band_id' => 'required|exists:bands,id',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'The title is required.',
            'duration.required' => 'The duration is required.',
            'duration.regex' => 'The duration must be in the format MM:SS.',
            'band_id.required' => 'The band ID is required.',
            'band_id.exists' => 'The selected band ID is invalid.',
        ];
    }

}
