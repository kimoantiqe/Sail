import click
from cli import pass_context


@click.command('stop', short_help='Stops sail project')
@pass_context
def cli(ctx):
    """Stops sail project"""
    #TODO