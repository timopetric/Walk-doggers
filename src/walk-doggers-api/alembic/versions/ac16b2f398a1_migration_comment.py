"""migration comment

Revision ID: ac16b2f398a1
Revises: f671d532bcb7
Create Date: 2021-05-15 23:05:20.740800

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ac16b2f398a1'
down_revision = 'f671d532bcb7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('description', sa.String(), nullable=True))
    op.add_column('user', sa.Column('image_url', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'image_url')
    op.drop_column('user', 'description')
    # ### end Alembic commands ###
