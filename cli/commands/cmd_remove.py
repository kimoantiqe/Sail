import click
from cli import pass_context


@click.command('remove', short_help='Completly removes sail from vps')
@pass_context
def cli(ctx):
    """Completly removes sail from vps"""
    #TODO