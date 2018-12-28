import click
from cli import pass_context


@click.command('setup', short_help='Setups sail on vps')
@pass_context
def cli(ctx):
    """Setups sail on vps"""
    #TODO