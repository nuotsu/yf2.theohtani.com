export async function getUserInfo(accessToken: string) {
	try {
		const response = await fetch(
			'https://api.login.yahoo.com/openid/v1/userinfo',
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					Accept: 'application/json',
				},
			},
		)

		if (response.ok) {
			return await response.json()
		}
	} catch (error) {
		console.error(error)
	}
	return null
}
