"""Delete account handler."""
import json
import os

from utils.db import query_one, execute, escape, get_schema
from utils.jwt_utils import verify_access_token
from utils.http import response, error


def handle(event: dict, origin: str = '*') -> dict:
    """Delete user account and all associated data."""
    jwt_secret = os.environ.get('JWT_SECRET')
    if not jwt_secret:
        return error(500, 'JWT_SECRET not configured', origin)

    headers = event.get('headers', {})
    auth_header = headers.get('X-Authorization', headers.get('authorization', ''))
    
    if not auth_header or not auth_header.startswith('Bearer '):
        return error(401, 'Требуется авторизация', origin)

    token = auth_header.replace('Bearer ', '').strip()
    
    try:
        payload = verify_access_token(token)
        user_id = payload['user_id']
    except Exception:
        return error(401, 'Неверный токен', origin)

    S = get_schema()

    user = query_one(f"""
        SELECT id, email FROM {S}users WHERE id = {escape(user_id)}
    """)

    if not user:
        return error(404, 'Пользователь не найден', origin)

    execute(f"DELETE FROM {S}email_verification_tokens WHERE user_id = {escape(user_id)}")
    execute(f"DELETE FROM {S}password_reset_tokens WHERE user_id = {escape(user_id)}")
    execute(f"DELETE FROM {S}refresh_tokens WHERE user_id = {escape(user_id)}")
    execute(f"DELETE FROM {S}users WHERE id = {escape(user_id)}")

    return response(200, {
        'success': True,
        'message': 'Аккаунт успешно удалён'
    }, origin)
