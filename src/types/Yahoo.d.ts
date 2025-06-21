declare global {
	namespace Yahoo {
		interface UserProfile {
			sub: string
			name: string
			given_name: string
			family_name: string
			nickname: string
			locale: string
			profile_images: {
				image32: string
				image64: string
				image128: string
				image192: string
			}
			picture: string
		}
	}
}

export {}
